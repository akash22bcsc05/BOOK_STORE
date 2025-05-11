import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async () => {
        try {
            if (
                !Data.url ||
                !Data.title ||
                !Data.author ||
                !Data.price ||
                !Data.desc ||
                !Data.language
            ) {
                alert("Please fill all the fields");
                return;
            }

            const response = await axios.post(
                "http://localhost:1000/api/v1/add-book",
                Data,
                { headers }
            );

            setData({
                url: "",
                title: "",
                author: "",
                price: "",
                desc: "",
                language: "",
            });

            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="h-full p-0 md:p-4">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                Add Book
            </h1>
            <div className="p-4 bg-zinc-800 rounded">
                <div>
                    <label className="text-zinc-400">Image</label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="url of image"
                        name="url"
                        value={Data.url}
                        onChange={change}
                    />
                </div>
                <div className="mt-4">
                    <label className="text-zinc-400">Title of Book</label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="title of book"
                        name="title"
                        value={Data.title}
                        onChange={change}
                    />
                </div>
                <div className="mt-4">
                    <label className="text-zinc-400">Author of Book</label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="author of book"
                        name="author"
                        value={Data.author}
                        onChange={change}
                    />
                </div>
                <div className="mt-4 flex gap-4">
                    <div className="w-1/2">
                        <label className="text-zinc-400">Language</label>
                        <input
                            type="text"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="language of book"
                            name="language"
                            value={Data.language}
                            onChange={change}
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="text-zinc-400">Price</label>
                        <input
                            type="number"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="price of book"
                            name="price"
                            value={Data.price}
                            onChange={change}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="text-zinc-400">Description</label>
                    <textarea
                        rows="4"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="description of book"
                        name="desc"
                        value={Data.desc}
                        onChange={change}
                    />
                </div>
                <button
                    className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
                    onClick={submit}
                >
                    Add Book
                </button>
            </div>
        </div>
    );
};

export default AddBook;
