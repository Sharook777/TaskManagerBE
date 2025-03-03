import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: "Email Required",
  },
  name: {
    type: String,
    required: "Name Required",
  },
  password: { type: String, select: false, required: "Password Required" },
  active: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

schema.pre("save", async function (next) {
  let user = this;

  try {
    const alreadyExists = await User.exists({ email: user.email });
    if (alreadyExists) {
      return next(new Error("Email already used!"));
    }

    if (!user.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    this.password = hash;
    next();
  } catch (er) {
    return next(new Error(er.message));
  }
});

schema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    done(err, isMatch);
  });
};

const User = mongoose.model("User", schema);

export default User;
