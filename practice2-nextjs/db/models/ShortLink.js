const { default: mongoose } = require("mongoose");

const shortLinkSchema = new mongoose.Schema(
  // mongoose에서 모델을 만들때는 일단 Schema라는 걸 만듬
  // 스키마는 모델의 구조와 프로퍼티 같은 걸 정하는 거라고 생각하면 됨
  {
    title: { type: String, default: "" },
    url: { type: String, default: "" },
    shortUrl: { type: String, default: "" },
  },
  {
    // 이제 여기다가 생성날짜, 수정날까지 정해볼거임 createdAt, updatedAt이라는 프로퍼티를 만들건데
    // 이런 건 대부분의 모델에서 쓰기 때문에 mongoose에서 편하게 추가해서 사용가능함 Schema를 만들때 옵션으로
    // timestams라는 옵션을 추가할거임 이렇게 하면 mongoose를 통해서 모델을 생성하거나 수정할 때 타임 스탬프를 찍음
    timestamps: true,
  }
);

// 스키마를 가지고 mongoose.model 메서드를 호출해서 모델을 만듬
// 첫 번째 아규먼트로는 모델의 이름을 넣는데 이 이름은 나중에 왼쪽에 있는 코드처럼 mongoose.models 프로퍼티에서 활용하니까 정확하게 정해야함
// 이 파일에서 한가지 특이한 점이 있는데 ShortLink라는 변수를 보면 mongoose.models에 있는지 먼저 확인하고 만약에 없다면 모델을 생성함
// 다양한 파일들에서 모델을 임포트해서 쓰기 때문에 모델을 여러 번 만들지 않기 위해서 보통 이러한 구조로 구현해서 씀
const ShortLink =
  mongoose.models["ShortLink"] || mongoose.model("ShortLink", shortLinkSchema);

export default ShortLink;
