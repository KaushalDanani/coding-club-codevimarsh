const Resource = require('../models/resource');

exports.addBook = async(req,res) => {
    const subject = req.body.sub_id;
  const book = {
    title : req.body.book,
    link:req.body.link,
    author:req.body.author,
    edition:req.body.edition,
    thumbnail:req.body.thumbnail,
  }
  const subObj = await Resource.findById(subject);
  subObj.books.push(book);
  const a = await subObj.save();
  // console.log(a);
  res.send({message : "Book added successfully!"});
}

exports.addNote = async(req,res) => {
    const subject = req.body.sub_id;
  const note = {
    title : req.body.note,
    link:req.body.link,
  }
  const subObj = await Resource.findById(subject);
  subObj.notes.push(note);
  const a = await subObj.save();
  // console.log(a);
  res.send({message : "Note added successfully!"});
}

exports.addVideo = async(req,res) => {
    const subject = req.body.sub_id;
  const video = {
    title : req.body.video,
    link:req.body.link,
    channel:req.body.channel,
    source:req.body.source,
  }
  const subObj = await Resource.findById(subject);
  subObj.videos.push(video);
  const a = await subObj.save();
  // console.log(a);
  res.send({message : "Video added successfully!"});
}

exports.delBook = async(req,res) => {
    try {
        const id = req.params.sub_id;
        const updatedbooks = req.body.updatedbooks;
  
        console.log("Received request:");
        console.log("ID:", id);
        console.log("Updated books:", updatedbooks);
  
        const result = await Resource.updateOne({ _id: id }, { $set: { books: updatedbooks } });
        
        console.log("Database update result:", result);
  
        if (result.nModified === 1) {
            return res.json({ message: 'books updated successfully' });
        } else {
            return res.status(404).json({ error: 'book not found or no changes were made' });
        }
    } catch (error) {
        console.error('Error updating books:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

exports.delVideo = async(req,res) => {
    try {
        const id = req.params.sub_id;
        const updatedvideos = req.body.updatedvideos;
  
        console.log("Received request:");
        console.log("ID:", id);
        console.log("Updated videos:", updatedvideos);
  
        const result = await Resource.updateOne({ _id: id }, { $set: { videos: updatedvideos } });
        
        console.log("Database update result:", result);
  
        if (result.nModified === 1) {
            return res.json({ message: 'videos updated successfully' });
        } else {
            return res.status(404).json({ error: 'video not found or no changes were made' });
        }
    } catch (error) {
        console.error('Error updating videos:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

exports.delNote = async(req,res) => {
    try {
        const id = req.params.sub_id;
        const updatedNotes = req.body.updatednotes;
  
        console.log("Received request:");
        console.log("ID:", id);
        console.log("Updated Notes:", updatedNotes);
  
        const result = await Resource.updateOne({ _id: id }, { $set: { notes: updatedNotes } });
        
        console.log("Database update result:", result);
  
        if (result.nModified === 1) {
            return res.json({ message: 'Notes updated successfully' });
        } else {
            return res.status(404).json({ error: 'Note not found or no changes were made' });
        }
    } catch (error) {
        console.error('Error updating notes:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}