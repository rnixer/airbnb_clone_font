const validate = (schema) => (input) => {
  const { error } = schema.validate(input, { abortEarly: false }); //{abortEarly: false} ทำให้จะทำการ validate ทุกข้อผิดพลาดแทนที่จะหยุดหลังจากข้อผิดพลาดแรก
  // console.dir(error)
  if (error) {
    const result = error.details.reduce((acc, el) => {
      //ทวน reduce
      acc[el.path[0]] = el.message; //ถ้า error.details มี { path: ["username"], message: "Invalid username" }, และ acc เริ่มต้นเป็น {} ก่อนการลูป, บรรทัด acc[el.path[0]] = el.message จะทำให้ acc เปลี่ยนเป็น { "username": "Invalid username" }
      return acc;
    }, {});
    return result;
  }
};

export default validate;
