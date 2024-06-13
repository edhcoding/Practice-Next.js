import mongoose from "mongoose";

// Next.js에서 권장하는 방법으로 mongoose 사용해볼거임
// (https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose)
// next.js/examples/with-mongodb-mongoose/lib/dbConnect.js 안에있는 코드를 복붙

// mongoose에서는 connect라는 함수를 사용해서 connection이라는 걸 만듬
// next.js 개발환경이나 vercel 서비스로 배포했을 때 connection을 불필요하게 여러 번 생성하는 걸 막기 위해서
// 이런 식으로 방어적인 코드를 작성하는걸 권장함

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// 방어적인 코드를 짜기 위해 cached라는 객체를 만들어 놓고 씀
// global이라는건 웹 브라우저 상에서 쓰던 window 객체 같은거라고 생각하면 됨 (node.js에서는 global이라는 전역 객체가 있음)
// 여기다가 mongoose라는 객체를 만들어 놓고 값들을 보관함
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
  // conn은 connection과 같음
}

async function dbConnect() {
  // 정리 - dbConnect라는 함수를 호출했을때 mongoose connection을 하나만 만들고 싶어서 안전하게 코드를 작성한 거라고 생각하면 됨
  if (cached.conn) {
    return cached.conn;
  }
  // Mongoose를 사용하면 mongoose 가 MongoDB에 연결될 때까지 기다리지 않고 즉시 모델 사용을 시작할 수 있습니다.
  // 이는 mongoose 가 내부적으로 모델 함수 호출을 버퍼링하기 때문입니다.
  // 이 버퍼링은 편리하지만 혼동을 일으키는 일반적인 원인이기도 합니다.
  // Mongoose 는 연결하지 않고 모델을 사용하면 기본적으로 오류가 발생하지 않습니다.
  // bufferCommands 가 켜져 있고 연결이 중단된 경우 bufferCommands 를 꺼서 연결이 제대로 열리지 않았는지 확인해보세요.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    // dbConnect함수에서는 mongoose.connect를 호출했을때 리턴되는 promise를 저장해두고 혹시나 dbConnect가 여러번 호출되는
    // 경우라면  이미 있는 promise값을 활용함
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    // promise가 fulfilled되면 mongoose의 connection값을 리턴함 이걸 cached객체의 conn에다가 저장해 놓고 씀
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
