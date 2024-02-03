import { faker } from "@faker-js/faker";
import { sign } from "jsonwebtoken";

const generateToken = () => {
  const email = faker.internet.email();

  return sign({ email }, "grd", {
    expiresIn: "1h",
  });
};

export { generateToken };
