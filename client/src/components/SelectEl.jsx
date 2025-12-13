import Select from 'react-select'

export default function SelectEl({ appendToForm }) {
  const options = [
    { value: 'DNA', label: 'DNA' },
    { value: 'RNA', label: 'RNA' },
  ]

  return (
    <Select
      options={options}
      defaultValue={options[0]}
      isSearchable={false}
      onChange={(opt) => appendToForm('seq_type', opt.value)}
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: '#0f172a',
          borderColor: state.isFocused ? '#22d3ee' : '#1e293b',
          boxShadow: 'none',
          minHeight: 36,
          minWidth: 100
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: '#0f172a',
          border: '1px solid #1e293b',
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused
            ? '#172554'
            : state.isSelected
            ? '#1e293b'
            : '#0f172a',
          color: '#e5e7eb',
          cursor: 'pointer',
        }),
        singleValue: (base) => ({
          ...base,
          color: '#e5e7eb',
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: '#94a3b8',
        }),
        indicatorSeparator: (base) => ({
          ...base,
          backgroundColor: '#1e293b',
        }),
      }}
    />
  )
}
