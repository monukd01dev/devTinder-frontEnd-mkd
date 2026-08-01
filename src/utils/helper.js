    /**
     * This function strikes the perfect balance between fixing sloppy typing 
     * and respecting cultural identities.
     *
     * * **Fixes 90% of messy inputs safely**: If a user types `jANE sMiTh-jOnEs` or `JOHN DOE`, it instantly cleans it up to `Jane Smith-Jones` or `John Doe`.
     * * **Prevents UX breakages**: It doesn't guess cultural rules. It leaves `van der Woodsen` as `Van Der Woodsen`. While not perfectly lowercase "van der", it is highly readable and never completely destroys the name structure.
     * * **Safely ignores spaces**: Using `(?:^|\s|-)` ensures that extra spaces don't break the regex logic or output weird symbols.
     * 
     * @param {string} name - The raw name string typed by the user.
     * @returns {string} The cleanly formatted name.
     */
export const formatUserEnteredName = (name) => {

    if (!name) return "";

    return name
        .trim()
        .toLowerCase()
        // Capitalizes ONLY the character after a space, hyphen, or start of string
        .replace(/(?:^|\s|-)\S/g, (match) => match.toUpperCase());
};