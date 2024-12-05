const Material = ({ name, type, tags, amount, createdAt, updatedAt, onEdit}) => {
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td class="px-6 py-4">{name}</td>
      <td class="px-6 py-4">{type}</td>
      <td class="px-6 py-4">{tags}</td>
      <td class="px-6 py-4">{amount}</td>
      <td class="px-6 py-4">{createdAt}</td>
      <td class="px-6 py-4">{updatedAt}</td>
      <td class="px-6 py-4">
        <button onClick={onEdit} class="text-blue-600 hover:underline">Edit</button>
      </td>
    </tr>
  );
};

export default Material;