import Friend from "./Friend"

export default function FriendList({
    friendsArray,
    onSelection,
    selectedFriend,
}) {
    return (
        <ul>
            {friendsArray.map((friend) => (
                <Friend
                    key={friend.id}
                    friend={friend}
                    onSelection={onSelection}
                    selectedFriend={selectedFriend}
                />
            ))}
        </ul>
    )
}
