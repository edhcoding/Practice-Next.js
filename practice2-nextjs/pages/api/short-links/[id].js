import dbConnect from '@/db/dbConnect';
import ShortLink from '@/db/models/ShortLink';

// id가 포함된 엔드포인트
export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      // GET 리퀘스트를 보내면 해당하는 shortLink document 보여줌
      const shortLink = await ShortLink.findById(id);
      res.send(shortLink);
      break;

    case 'PATCH':
      // PATCH 리퀘스트는 document를 업데이트 해줄 수 있음
      const updatedShortLink = await ShortLink.findByIdAndUpdate(id, req.body, { new: true });
      res.send(updatedShortLink);
      break;

    case 'DELETE':
      // DELETE 리퀘스트는 document 삭제할 수 있음
      await ShortLink.findByIdAndDelete(id);
      res.status(204).send();
      break;

    default:
      res.status(404).send();
      break;
  }
}
