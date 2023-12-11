import { useState } from "react"
import Button from "./components/Button"
import FriendList from "./components/FriendList"
import FormAddFriend from "./components/FormAddFriend"
import FormSplitBill from "./components/FormSplitBill"

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
    const [selectedFriend, setSelectedFriend] = useState(null)

    function handleShowAddFriend() {
        setShowAddFriend((show) => !show)
        setShowAddFriend(!showAddFriend)
    }

    function handleAddFriend(friend) {
        setFriends([...friends, friend])
    }

    function handleSelection(friend) {
        setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend))
        setShowAddFriend(false)
    }

    function handleSplitBill(value) {
        setFriends((friends) =>
            friends.map((friend) =>
                friend.id === selectedFriend.id
                    ? { ...friend, balance: friend.balance + value }
                    : friend,
            ),
        )

        setSelectedFriend(null)
    }

    return (
        <div className="app">
            <div className="logo">
                <h1>EAT-N-SPLIT</h1>
                <h3>By Eik</h3>
            </div>
            <div className="sidebar">
                <FriendList
                    friendsArray={friends}
                    selectedFriend={selectedFriend}
                    onSelection={handleSelection}
                />

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
            {selectedFriend && (
                <FormSplitBill
                    selectedFriend={selectedFriend}
                    onSplitBill={handleSplitBill}
                />
            )}
        </div>
    )
}
