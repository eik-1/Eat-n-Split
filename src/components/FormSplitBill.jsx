import { useState } from "react"
import Button from "./Button"

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
    const [bill, setBill] = useState("")
    const [userBill, setUserBill] = useState("")
    const friendBill = bill ? bill - userBill : ""
    const [payer, setPayer] = useState("user")

    function handleSubmit(e) {
        e.preventDefault()

        if (!bill || !userBill) return

        onSplitBill(payer === "user" ? friendBill : -userBill)
    }

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split the bill with {selectedFriend.name}</h2>
            <label>💵 Bill Value</label>
            <input
                type="text"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
            />

            <label>🧍‍♂️ Your Expenses</label>
            <input
                type="text"
                value={userBill}
                onChange={(e) =>
                    setUserBill(
                        Number(e.target.value) > bill
                            ? userBill
                            : Number(e.target.value),
                    )
                }
            />

            <label>🧑‍🤝‍🧑 {selectedFriend.name}'s Expenses</label>
            <input type="text" disabled value={friendBill} />

            <label>🤑 Who is paying the bill ?</label>
            <select value={payer} onChange={(e) => setPayer(e.target.value)}>
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>Split Bill</Button>
        </form>
    )
}
