import { useState } from "react"

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
]

export default function App() {
    const [showAddFriend, setShowAddFriend] = useState(false)
    const [friends, setFriends] = useState(initialFriends)

    function handleShowAddFriend() {
        setShowAddFriend((show) => !show)
        setShowAddFriend(!showAddFriend)
    }

    function handleAddFriend(friend) {
        setFriends([...friends, friend])
    }

    return (
        <div className="app">
            <div className="logo">
                <h1>EAT-N-SPLIT</h1>
                <h3>By Eik</h3>
            </div>
            <div className="sidebar">
                <FriendList friendsArray={friends} />
                {showAddFriend && (
                    <FormAddFriend
                        friendsArray={friends}
                        setFriends={handleAddFriend}
                    />
                )}
                <Button onClick={handleShowAddFriend}>
                    {showAddFriend ? "Close" : "Add Friend"}
                </Button>
            </div>
            <FormSplitBill />
        </div>
    )
}

function Button({ children, onClick }) {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    )
}

function FriendList({ friendsArray }) {
    return (
        <ul>
            {friendsArray.map((friend) => (
                <Friend key={friend.id} friend={friend} />
            ))}
        </ul>
    )
}

function Friend({ friend }) {
    return (
        <li>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (
                <p className="red">
                    You owe {friend.name} ${Math.abs(friend.balance)}
                </p>
            )}
            {friend.balance > 0 && (
                <p className="green">
                    {friend.name} owes you ${Math.abs(friend.balance)}
                </p>
            )}
            {friend.balance === 0 && <p>You and {friend.name} are even</p>}
            <Button>Select</Button>
        </li>
    )
}

function FormAddFriend({ friendsArray, setFriends }) {
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

function FormSplitBill() {
    return (
        <form className="form-split-bill">
            <h2>Split the bill with X</h2>
            <label>💵 Bill Value</label>
            <input type="text" />
            <label>🧍‍♂️ Your Expenses</label>
            <input type="text" />
            <label>🧑‍🤝‍🧑 X's Expenses</label>
            <input type="text" disabled />
            <label>🤑 Who is paying the bill ?</label>
            <select>
                <option value="user">You</option>
                <option value="friend">X</option>
            </select>
            <Button>Split Bill</Button>
        </form>
    )
}
