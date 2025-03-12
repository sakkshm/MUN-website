const zod = require("zod");

const userSchema = zod.object({
    username: zod.string(),
    phoneNumber: zod.string().length(10),
    password: zod.string().min(8),
})

const registerSchema = zod.object({
    userId: zod.string(),
    username: zod.string(),
    phoneNumber: zod.string().length(10),
    emailID: zod.string().email(),
    college: zod.string(),

    preferences: zod.object({
        committee1: zod.string(),
        portfolio1: zod.string(),
        portfolio2: zod.string(),

        committee2: zod.string(),
        portfolio3: zod.string(),
        portfolio4: zod.string(),
    }),

    previousMUNexperience: zod.string(),
    refference: zod.string()

})


module.exports = {
    userSchema,
    registerSchema
}