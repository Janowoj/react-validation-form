import Dropdown from "../components/Dropdown";

function DropdownPage() {
  const options = [
    { id: 1, label: "USA", value: "US" },
    { id: 2, label: "Polska", value: "PL" },
  ];

  return (
    <div className="flex">
      <Dropdown options={options} />
    </div>
  );
}

export default DropdownPage;
