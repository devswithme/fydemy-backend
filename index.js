const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("./generated/prisma");
const { PrismaClientKnownRequestError, PrismaClientValidationError } = require("@prisma/client/runtime/library");
const db = new PrismaClient();

dotenv.config();
const app = express();
app.use(express.json())

app.get("/books", async (req, res) => {
  const data = await db.books.findMany();
  res.json(data);
});

app.post('/books', async (req, res) => {
  try {
    const {nama, peminjam} = req.body
    await db.books.create({
      data: {nama, peminjam}
    })
    res.status(201).json({message: 'Buku berhasil ditambahkan!'})
  } catch (err){
    if(err instanceof PrismaClientKnownRequestError){
      console.log(err.message, err.code)
      res.status(500).json({message: err.message})
    } else if(err instanceof PrismaClientValidationError){
      res.status(500).json({message: 'validasi salah'})
    } else {
      res.status(500).json({message: 'error'})
    }
  }
})

app.put('/books/:id', async (req, res) => {
  const {id} = req.params
  const {nama, peminjam} = req.body
  await db.books.update({
    where: {id},
    data: {nama, peminjam}
  })
  res.json({message: 'Buku berhasil diupdate!'})
})

app.listen(process.env.APP_PORT, () => {
  console.log("Server sedang berjalan");
});
