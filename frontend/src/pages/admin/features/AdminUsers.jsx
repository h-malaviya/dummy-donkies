import { useState, useMemo } from "react";
import ProfilePopup from "../../profile/features/ProfilePopup";
import './styles/adminUsers.scss'
import { getClassNames } from "../../../shared/utils/global";
import useUsers from "../../../hooks/useUser";
import Loading from "../../../shared/components/Loading";
import { useOutletContext } from "react-router-dom";
import edit from '../../../assets/icons/edit.png'
import trash from '../../../assets/icons/trash.png'
export default function AdminUsers() {
    const [selectedUser, setSelectedUser] = useState(null);
    const { users, loading, error, deleteUser, updateUser } = useUsers();
    const { search } = useOutletContext();
    const onDeleteUser = async (id, username) => {
        try {
            const ok = window.confirm(
                `Are you sure you want to delete ${username}? This action cannot be undone.`
            );
            if (ok) {
                await deleteUser(id);
            }
        } catch (error) {
            window.alert(error)
        }

    };

    const onUpdateUser = async (id, updatedData) => {
        try {
            await updateUser(id, updatedData);
            setSelectedUser(null);
        } catch (error) {
            window.alert(error);
        }
    };
    const filteredUsers = useMemo(() => {
        if (!search.trim()) return users;

        const q = search.toLowerCase();

        return users.filter((u) =>
            u.email.toLowerCase().includes(q) ||
            u.username.toLowerCase().includes(q) ||
            u.phone.toLowerCase().includes(q) ||
            u.address?.city?.toLowerCase().includes(q)
        );
    }, [search, users]);
    if (loading) return <Loading />;
    if (error) return <p>Failed to load users</p>;
    return (
        <>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th />
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.map(u => (
                        <tr key={u.id}>
                            <td data-label="Email">{u.email}</td>
                            <td data-label="Username">{u.username}</td>
                            <td data-label="Phone">{u.phone}</td>
                            <td data-label="City">{u.address.city}</td>

                            <td data-label="Actions">
                                <div className="admin-actions">
                                    <button onClick={() => setSelectedUser(u)}>
                                        <img className="admin-icons" src={edit} alt="edit-icon" />
                                    </button>
                                    <button className="delete" onClick={() => {

                                        onDeleteUser(u.id, u.username)

                                    }}>
                                        <img className="admin-icons" src={trash} alt="delete-icon" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div
                className={`overlay ${getClassNames(selectedUser, "show")}`}
                onClick={() => setSelectedUser(null)}
            />
            {selectedUser && (
                <ProfilePopup className='profile-popup'
                    isOpen
                    userData={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onUpdate={onUpdateUser}
                    isProfileEdit={false}
                />
            )}
        </>
    );
}
