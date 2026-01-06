const ID_OFFSET = 1_000_00; 

export const generateId = () => {
  const lastId = ID_OFFSET;
  const nextId = lastId + 1;

  localStorage.setItem("last_id", nextId);
  return nextId;
};