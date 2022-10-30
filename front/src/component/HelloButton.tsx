const HelloButton = () => {
    const onClick = () => {
        alert("Hello!");
    };

    return <button onClick={onClick}>Hello!</button>;
};

export default HelloButton;
