export const validateBodyAsUser = (user) => {
    return (typeof user === "object" &&
        typeof user.uid === "string");
};
