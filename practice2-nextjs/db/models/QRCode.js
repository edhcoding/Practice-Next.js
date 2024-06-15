import mongoose from 'mongoose';

// QRCode모델은 생성한 QRCode 모델을 저장할 모델임
const qrcodeSchema = new mongoose.Schema(
  // title: QRCode 제목, url: 원래 주소
  {
    title: { type: String, default: '' },
    url: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const QRCode =
  mongoose.models['QRCode'] || mongoose.model('QRCode', qrcodeSchema);

export default QRCode;
