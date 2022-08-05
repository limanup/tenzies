const Die = ({
    value,
    isHeld,
    toggleHold,
}: {
    value: number;
    isHeld: boolean;
    toggleHold: React.MouseEventHandler<HTMLDivElement>;
}) => {
    return (
        <div
            className={`die isHeld-${String(isHeld)} die-${String(value)}`}
            onClick={toggleHold}
        ></div>
    );
};

export default Die;
