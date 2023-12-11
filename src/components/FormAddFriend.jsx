import { useState } from "react"
import Button from "./Button"

export default function FormAddFriend({ friendsArray, setFriends }) {
    const [name, setName] = useState("")
    const [img, setImg] = useState("https://i.pravatar.cc/48")

    function handleSubmit(e) {
        e.preventDefault()

        if (!name || !img) return

        let id = crypto.randomUUID()
        const newFriend = {
            id,
            name,
            img: `${img}?=${id}`,
            balance: 0,
        }
        setFriends(newFriend)
        setName("")
        setImg("https://i.pravatar.cc/48")
    }

    return (
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label>🧑‍🤝‍🧑 Friend Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label>🌆 Image URL</label>
            <input
                type="text"
                value={img}
                onChange={(e) => setImg(e.target.value)}
            />
            <Button>Add</Button>
        </form>
    )
}
