const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
    default: "",
  },
  officeName: {
    type: String,
    require: [true, "오피스의 이름을 입력해주세요"],
  },
  grade: {
    type: String,
    require: true,
    default: "",
  },
  address: {
    legion: {
      type: String,
      require: [true, "주소를 입력해주세요"],
    },
    city: {
      type: String,
      require: [true, "주소를 입력해주세요"],
    },
    town: {
      type: String,
      require: [true, "주소를 입력해주세요"],
    },
  },
  price: {
    type: String,
    require: true,
    default: "",
  },
  option: {
    type: Array,
    require: true,
    default: [],
  },
  image: {
    type: String,
    require: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
