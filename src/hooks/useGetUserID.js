// Getting the id from the localstorage to allow user to create a recipe
const useGetUserID = () => {
    return window.localStorage.getItem("userID");
};

export default useGetUserID;
