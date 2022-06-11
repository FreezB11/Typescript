import mongoose from 'mongoose';

const connect = mongoose.connect('mongodb+srv://yashraj:yashraj0403@cluster0.6vlbp.mongodb.net/?retryWrites=true&w=majority', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
  }, () => {
    console.log('connected to database')
  })

export = connect;