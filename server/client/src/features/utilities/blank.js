return (
  <div
    className={styles.list}
    ref={drop}
    style={{ backgroundColor: isOver ? "blue" : "white" }}
  >
    <p>
      {listName}
    </p>
    {/* {canDrop ? "Release to drop" : "Drag a box here"} */}
    {[...cards]
      .sort((a, b) => a.index - b.index)
      .map((card) => (
        <Card
          key={card._id}
          id={card._id}
          name={card.name}
          listId={listId}
          index={card.index}
        />
      ))}
    <AddItem title="Add a card" boardId={boardId} listId={listId} />
  </div>
);