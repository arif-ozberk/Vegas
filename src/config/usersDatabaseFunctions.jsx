// Vegas Database
import vegas_database from "./supabaseClient";


const fetchUserData = async () => {
    const { data, error } = await vegas_database
        .from("users")
        .select()

    if (error) {
        console.log(error);
    }

    if (data) {
        console.log(data);
    }
}


const addNewUserData = async (setUserBalance, user, setUserDetails) => {
    const { data, error } = await vegas_database
        .from("users")
        .insert({ username: user.nickname, auth0_id: user.sub, user_balance: 2000 })
        .select()

    if (error) {
        console.log(error);
    }

    if (data) {
        setUserBalance(data[0].user_balance);
        setUserDetails(data[0]);
    }
}


const checkIfUserExist = async (setUserBalance, user, setUserDetails) => {
    const { data, error } = await vegas_database
        .from("users")
        .select()
        .eq("auth0_id", user.sub)

    if (error) {
        console.log(error);
    }

    if (data.length !== 0) {
        setUserBalance(data[0].user_balance);
        setUserDetails(data[0]);
    }

    if (data.length === 0) {
        addNewUserData(setUserBalance, user, setUserDetails);
    }
}


const updateUserBalance = async (userBalance, user) => {
    const { data, error } = await vegas_database
        .from("users")
        .update({ user_balance: userBalance })
        .select()
        .eq("auth0_id", user.sub);

    if (error) {
        console.log(error);
    }
}


export default {fetchUserData, addNewUserData, checkIfUserExist, updateUserBalance}