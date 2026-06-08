import { useContext } from "react";
import { UserListsContext } from "../context/UserListsContext";

export default function useUserLists() {
    return useContext(UserListsContext);
}
