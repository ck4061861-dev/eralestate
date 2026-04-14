import Contract from '../Models/contract.model.js';
import User from '../Models/userAuth.Model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const findUploadedDocumentPath = (docItem) => {
  const fileReference = docItem.filepath || docItem.url;
  if (fileReference) {
    return path.join(__dirname, '../../uploads', fileReference.replace(/^\/uploads\//, ''));
  }

  const contractsDir = path.join(__dirname, '../../uploads/contracts');
  if (!fs.existsSync(contractsDir)) return null;

  const files = fs.readdirSync(contractsDir);
  const match = files.find((file) => file.endsWith(docItem.filename));
  return match ? path.join(contractsDir, match) : null;
};

export const createContract = async (req, res) => {
  try {
    const { property, unit, customer, customerId, contractType, amount, billingCycle, securityDeposit, lateFee, startDate, endDate, additionalNotes, documents } = req.body;

    if (!property || !amount) {
      return res.status(400).json({ success: false, message: 'Property and amount are required' });
    }

    // If customerId is not provided, try to find user by customer email
    let resolvedCustomerId = customerId;
    if (!resolvedCustomerId && customer && customer.email) {
      try {
        const user = await User.findOne({ email: customer.email });
        console.log(`🔍 Looking up user with email "${customer.email}":`, user ? `✅ Found ${user._id}` : '❌ Not found');
        if (user) {
          resolvedCustomerId = user._id;
        }
      } catch (userError) {
        console.warn('⚠️ Error looking up user:', userError.message);
        // Continue without customerId if lookup fails
      }
    }
    
    console.log('💾 Creating contract with:');
    console.log('  - customerId:', resolvedCustomerId);
    console.log('  - customer.email:', customer?.email);
    console.log('  - customer.name:', customer?.name);

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '../../uploads/contracts');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Process documents
    let savedDocuments = [];
    if (documents && documents.length > 0) {
      for (const doc of documents) {
        try {
          // Convert Base64 to Buffer
          const base64Data = doc.data.split(',')[1];
          const buffer = Buffer.from(base64Data, 'base64');
          
          // Create unique filename with timestamp
          const timestamp = Date.now();
          const ext = doc.filename.split('.').pop();
          const filename = `${timestamp}_${doc.filename}`;
          const filepath = path.join(uploadsDir, filename);
          
          // Save file to disk
          fs.writeFileSync(filepath, buffer);
          
          savedDocuments.push({
            filename: doc.filename,
            filepath: `/uploads/contracts/${filename}`,
            url: `/uploads/contracts/${filename}`,
            contentType: doc.contentType,
            size: doc.size,
            uploadedAt: new Date(),
          });
        } catch (err) {
          console.error('Error saving document:', err);
        }
      }
    }

    const newContract = new Contract({
      property,
      unit,
      customer,
      customerId: resolvedCustomerId,
      contractType,
      amount,
      billingCycle,
      securityDeposit,
      lateFee,
      startDate,
      endDate,
      additionalNotes,
      documents: savedDocuments,
      status: 'Draft',
      createdBy: resolvedCustomerId,
    });

    await newContract.save();
    console.log('✅ Contract saved with ID:', newContract._id);
    console.log('  - Saved customerId:', newContract.customerId);
    console.log('  - Saved customer.email:', newContract.customer?.email);
    
    await newContract.populate('property');
    res.status(201).json({ success: true, contract: newContract, message: `Contract created with ${savedDocuments.length} document(s)` });
  } catch (error) {
    console.error('❌ createContract error:', error.message);
    console.error('   Full error:', error);
    res.status(500).json({ success: false, message: error.message, error: error.toString() });
  }
};

export const getContracts = async (req, res) => {
  try {
    const contracts = await Contract.find()
      .populate('property')
      .populate('customerId', 'name email phone')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, contracts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findById(id)
      .populate('property')
      .populate('customerId', 'name email phone');
    
    if (!contract) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }
    
    res.status(200).json({ success: true, contract });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getContractsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('🔍 getContractsByUser: userId=', userId);

    // Get user details
    const user = await User.findById(userId);
    console.log('👤 User found:', user?.email);

    if (!user) {
      console.warn('⚠️ User not found, returning empty array');
      return res.status(200).json({ success: true, contracts: [] });
    }

    // Search by customerId first
    let contracts = await Contract.find({ customerId: userId })
      .populate('property')
      .sort({ createdAt: -1 });
    
    console.log(`📦 Found by customerId: ${contracts.length} contracts`);

    // If none found, search by customer.email
    if (contracts.length === 0 && user.email) {
      console.log('🔄 Searching by customer.email:', user.email);
      contracts = await Contract.find({ 'customer.email': user.email })
        .populate('property')
        .sort({ createdAt: -1 });
      
      console.log(`✅ Found by customer.email: ${contracts.length} contracts`);
    }

    // If STILL none, show all contracts for debugging
    if (contracts.length === 0) {
      const allContracts = await Contract.find({})
        .select('customer.email customerId customer.name');
      console.log('📋 ALL contracts in DB:', allContracts.map(c => ({
        customerId: c.customerId,
        email: c.customer?.email,
        name: c.customer?.name
      })));
    }

    console.log(`✅ Returning ${contracts.length} contracts to frontend`);
    res.status(200).json({ success: true, contracts });
  } catch (error) {
    console.error('❌ getContractsByUser error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, amount, billingCycle, securityDeposit, lateFee, startDate, endDate, additionalNotes } = req.body;

    const contract = await Contract.findByIdAndUpdate(
      id,
      {
        status,
        amount,
        billingCycle,
        securityDeposit,
        lateFee,
        startDate,
        endDate,
        additionalNotes,
      },
      { new: true }
    ).populate('property');

    if (!contract) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }

    res.status(200).json({ success: true, contract });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByIdAndDelete(id);

    if (!contract) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }

    res.status(200).json({ success: true, message: 'Contract deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const downloadDocument = async (req, res) => {
  try {
    const { contractId, docIndex } = req.params;
    
    const contract = await Contract.findById(contractId);
    if (!contract) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }

    const doc = contract.documents[docIndex];
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    const filepath = findUploadedDocumentPath(doc);
    if (!filepath || !fs.existsSync(filepath)) {
      return res.status(404).json({ success: false, message: 'File not found on server' });
    }

    res.download(filepath, doc.filename);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { contractId, docIndex } = req.params;
    
    const contract = await Contract.findById(contractId);
    if (!contract) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }

    const doc = contract.documents[docIndex];
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    // Delete file from server
    const filepath = path.join(__dirname, '../../uploads', doc.filepath.replace(/^\/uploads\//, ''));
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    // Remove from database
    contract.documents.splice(docIndex, 1);
    await contract.save();

    res.status(200).json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const downloadContractPDF = async (req, res) => {
  try {
    const { id } = req.params;

    const contract = await Contract.findById(id)
      .populate('property')
      .populate('customerId', 'name email phone');

    if (!contract) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }

    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      bufferPages: true,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Contract-${contract._id}.pdf"`);

    doc.pipe(res);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const margin = doc.page.margins.left;

    // --- Header ---
    doc.fillColor('#1d4ed8').font('Helvetica-Bold').fontSize(26).text('PropertyNext', margin, margin);
    doc.font('Helvetica').fontSize(10).fillColor('#6b7280')
      .text('123 Main Street, City, Country', margin, doc.y + 4)
      .text('contact@propertynext.com | +1 800 123 4567');
    
    doc.moveDown(1);
    doc.lineWidth(1).strokeColor('#e5e7eb').moveTo(margin, doc.y).lineTo(margin + pageWidth, doc.y).stroke();
    doc.moveDown(1);

    // --- Title ---
    doc.fillColor('#1f2937').font('Helvetica-Bold').fontSize(20).text('Rental Agreement');
    doc.moveDown(0.5);

    doc.font('Helvetica').fontSize(10).fillColor('#6b7280');
    doc.text(`Contract ID: ${contract._id}`);
    
    doc.text('Status: ', { continued: true });
    doc.font('Helvetica-Bold').fillColor('#16a34a').text((contract.status || 'ACTIVE').toUpperCase());
    
    doc.font('Helvetica').fillColor('#6b7280').text(`Generated: ${new Date().toLocaleDateString()}`);
    doc.moveDown(2);

    // --- Cards Section ---
    const cardWidth = (pageWidth - 20) / 2;
    const cardHeight = 120;
    const cardY = doc.y;

    // Property Card (blue-50: #eff6ff)
    doc.roundedRect(margin, cardY, cardWidth, cardHeight, 10).fill('#eff6ff');
    // Financial Card (green-50: #f0fdf4)
    doc.roundedRect(margin + cardWidth + 20, cardY, cardWidth, cardHeight, 10).fill('#f0fdf4');

    // Property Card Content
    doc.fillColor('#1d4ed8').font('Helvetica-Bold').fontSize(12).text('Property Details', margin + 15, cardY + 15);
    
    const pMargin = margin + 15;
    let pY = cardY + 35;
    
    const drawKeyValue = (label, value, x, y, valColor = '#374151') => {
      doc.font('Helvetica-Bold').fontSize(10).fillColor('#1f2937').text(`${label}: `, x, y, { continued: true });
      doc.font('Helvetica').fillColor(valColor).text(value || 'N/A');
      return y + 16;
    };

    pY = drawKeyValue('Title', contract.property?.title, pMargin, pY);
    pY = drawKeyValue('Location', contract.property?.location, pMargin, pY);
    pY = drawKeyValue('Unit', contract.unit, pMargin, pY);
    drawKeyValue('Client', contract.customer?.name, pMargin, pY);

    // Financial Card Content
    doc.fillColor('#15803d').font('Helvetica-Bold').fontSize(12).text('Financial Summary', margin + cardWidth + 20 + 15, cardY + 15);
    
    const fMargin = margin + cardWidth + 20 + 15;
    let fY = cardY + 35;
    
    fY = drawKeyValue('Amount', `£${(contract.amount || 0).toLocaleString()}`, fMargin, fY);
    fY = drawKeyValue('Billing', contract.billingCycle, fMargin, fY);
    fY = drawKeyValue('Deposit', `£${contract.securityDeposit || 0}`, fMargin, fY);
    fY = drawKeyValue('Late Fee', `£${contract.lateFee || 0}`, fMargin, fY);
    drawKeyValue('Period', `${contract.startDate ? new Date(contract.startDate).toLocaleDateString() : 'N/A'} - ${contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'N/A'}`, fMargin, fY);

    doc.y = cardY + cardHeight + 30;

    // --- Details Section ---
    const detailY = doc.y;

    // Contract Details Column
    doc.fillColor('#1f2937').font('Helvetica-Bold').fontSize(14).text('Contract Details', margin, detailY);
    
    let dY = detailY + 25;
    dY = drawKeyValue('Agreement Type', contract.contractType, margin, dY, '#4b5563');
    dY = drawKeyValue('Billing Cycle', contract.billingCycle, margin, dY, '#4b5563');
    dY = drawKeyValue('Security Deposit', `£${contract.securityDeposit || 0}`, margin, dY, '#4b5563');
    dY = drawKeyValue('Late Fee', `£${contract.lateFee || 0}`, margin, dY, '#4b5563');
    dY = drawKeyValue('Start Date', contract.startDate ? new Date(contract.startDate).toLocaleDateString() : 'N/A', margin, dY, '#4b5563');
    dY = drawKeyValue('End Date', contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'N/A', margin, dY, '#4b5563');
    dY = drawKeyValue('Total Amount', `£${(contract.amount || 0).toLocaleString()}`, margin, dY, '#4b5563');
    drawKeyValue('Status', (contract.status || 'ACTIVE').toUpperCase(), margin, dY, '#4b5563');

    // Client Info Column
    const rightColX = margin + (pageWidth / 2);
    doc.fillColor('#1f2937').font('Helvetica-Bold').fontSize(14).text('Client Info', rightColX, detailY);
    
    let cY = detailY + 25;
    cY = drawKeyValue('Name', contract.customer?.name, rightColX, cY, '#4b5563');
    cY = drawKeyValue('Email', contract.customer?.email, rightColX, cY, '#4b5563');
    cY = drawKeyValue('Phone', contract.customer?.phone, rightColX, cY, '#4b5563');

    cY += 15;
    doc.fillColor('#1f2937').font('Helvetica-Bold').fontSize(14).text('Notes', rightColX, cY);
    cY += 20;
    doc.font('Helvetica').fontSize(10).fillColor('#6b7280').text(contract.additionalNotes || 'No additional notes.', rightColX, cY, {
      width: (pageWidth / 2) - 10
    });

    const signatureY = Math.max(dY, cY, doc.y) + 60;
    
    if (signatureY > doc.page.height - 180) {
      doc.addPage();
      doc.y = margin;
    } else {
      doc.y = signatureY;
    }

    // --- Signature Section ---
    doc.fillColor('#1f2937').font('Helvetica-Bold').fontSize(14).text('Authorized Signatures', margin, doc.y);
    doc.moveDown(4);

    const sigLineY = doc.y;
    const sigWidth = 200;

    // Rep Signature
    doc.lineWidth(1).strokeColor('#d1d5db').moveTo(margin, sigLineY).lineTo(margin + sigWidth, sigLineY).stroke();
    doc.font('Helvetica').fontSize(10).fillColor('#4b5563').text('PropertyNext Representative', margin, sigLineY + 10, { width: sigWidth, align: 'center' });

    // Client Signature
    const rightSigX = margin + pageWidth - sigWidth;
    doc.lineWidth(1).strokeColor('#d1d5db').moveTo(rightSigX, sigLineY).lineTo(rightSigX + sigWidth, sigLineY).stroke();
    doc.text('Client / Tenant', rightSigX, sigLineY + 10, { width: sigWidth, align: 'center' });

    // --- Footer ---
    const oldMarginBottom = doc.page.margins.bottom;
    doc.page.margins.bottom = 0; // Temporarily remove bottom margin so footer doesn't trigger blank page
    const bottomY = doc.page.height - 30;
    doc.font('Helvetica').fontSize(8).fillColor('#9ca3af').text('PropertyNext Realty | Organized contract record for your business', margin, bottomY, {
      width: pageWidth,
      align: 'center'
    });
    doc.page.margins.bottom = oldMarginBottom;

    // --- Attachments (if any) ---
    if (contract.documents && contract.documents.length > 0) {
      doc.addPage();
      doc.y = margin;
      doc.fillColor('#1f2937').font('Helvetica-Bold').fontSize(16).text('Attached Documents', margin, doc.y);
      doc.moveDown(1);

      contract.documents.forEach((doc_item, idx) => {
        const docPath = findUploadedDocumentPath(doc_item);
        doc.font('Helvetica-Bold').fontSize(11).fillColor('#1f2937').text(`${idx + 1}. ${doc_item.filename}`);
        doc.font('Helvetica').fontSize(10).fillColor('#4b5563').text(`Size: ${typeof doc_item.size === 'number' ? `${(doc_item.size / 1024).toFixed(2)} KB` : 'Unknown'}`);
        doc.text(`Uploaded: ${doc_item.uploadedAt ? new Date(doc_item.uploadedAt).toLocaleDateString() : 'Unknown'}`);
        
        if (docPath && fs.existsSync(docPath) && /\.(jpg|jpeg|png|gif)$/i.test(doc_item.filename)) {
          try {
            doc.moveDown(0.3);
            doc.image(docPath, { width: 300 });
          } catch (imgErr) {
            console.warn(`Could not embed image ${doc_item.filename}:`, imgErr.message);
          }
        }
        doc.moveDown(1);
      });
    }

    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
