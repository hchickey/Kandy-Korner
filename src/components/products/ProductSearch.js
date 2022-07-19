export const ProductSearch = ({ setterFunction }) => {
    return (
        <div>
        <input
        onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        } type="text" placeholder="What candy are you looking for?" />
        </div>
    )
}