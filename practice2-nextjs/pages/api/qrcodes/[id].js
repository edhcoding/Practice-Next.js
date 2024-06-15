import dbConnect from '@/db/dbConnect';
import QRCode from '@/db/models/QRCode';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      // 도큐먼트 하나씩 조회
      const qrcode = await QRCode.findById(id);
      res.send(qrcode);
      break;

    case 'PATCH':
      // 도큐먼트 업데이트
      const updatedQRCode = await QRCode.findByIdAndUpdate(id, req.body, { new: true });
      res.send(updatedQRCode);
      break;

    case 'DELETE':
      // 도큐먼트 삭제
      await QRCode.findByIdAndDelete(id);
      res.status(204).send();
      break;

    default:
      res.status(404).send();
      break;
  }
}
