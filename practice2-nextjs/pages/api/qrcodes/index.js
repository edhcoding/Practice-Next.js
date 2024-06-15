import dbConnect from '@/db/dbConnect';
import QRCode from '@/db/models/QRCode';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      // 도큐먼트 생성
      const newQRCode = await QRCode.create(req.body);
      res.status(201).send(newQRCode);
      break;

    case 'GET':
      // 모든 도큐먼트 가져오기
      const qrcodes = await QRCode.find();
      res.send(qrcodes);
      break;

    default:
      res.status(404).send();
      break;
  }
}
