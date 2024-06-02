import React, { useState } from 'react';
import { AutoComplete as AntdAutoComplete, AutoCompleteProps } from 'antd';

interface SelectOptionsType {
  value: string;
  label: string;
}

interface Props extends AutoCompleteProps {
  options: SelectOptionsType[];
  onSelect?: (value: string) => void;
}

export const AutoComplete = (props: React.PropsWithChildren<Props>) => {
  const { options, onSelect, children, ...otherProps } = props;
  const [filteredOptions, setFilteredOptions] =
    useState<SelectOptionsType[]>(options);

  const onSearch = (value: string) => {
    const filteredOptions = options.filter(
      (option: { value: string; label: string }) =>
        option.label.toString().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  return (
    <AntdAutoComplete
      options={filteredOptions}
      onSearch={onSearch}
      onSelect={onSelect}
      {...otherProps}
    >
      {children}
    </AntdAutoComplete>
  );
};
