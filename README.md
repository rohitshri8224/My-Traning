# project-blogging-Group44

if (!/^[a-zA-Z0-9:-]+$/.test(data.title)) {
    return res.status(400).send({ status: false, message: `title should not be empty it contains only alphabets and numeric values and two special characters - and :` })
}