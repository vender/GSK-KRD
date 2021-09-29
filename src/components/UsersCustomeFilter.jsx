import * as React from 'react';
import { Form } from 'react-final-form';
import { Box, Button, InputAdornment } from '@material-ui/core';
import ContentFilter from "@material-ui/icons/FilterList";
import SearchIcon from '@material-ui/icons/Search';
import { TextInput, NullableBooleanInput, useListContext } from 'react-admin';

export const PostFilterButton = () => {
    const { showFilter } = useListContext();
    showFilter("main");
    return (
        <Button
            size="small"
            color="primary"
            onClick={() => showFilter("main")}
            startIcon={<ContentFilter />}
        >
            Фильтр
        </Button>
    );
};

export const PostFilterForm = () => {
  const {
    displayedFilters,
    filterValues,
    setFilters,
    hideFilter
  } = useListContext();

  if (!displayedFilters.main) return null;

  const onSubmit = (values) => {
    if (Object.keys(values).length > 0) {
      setFilters(values);
    } else {
      hideFilter("main");
    }
  };

  const resetFilter = () => {
    setFilters({}, []);
  };

  return (
    <div>
      <Form onSubmit={onSubmit} initialValues={filterValues}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" alignItems="flex-end" mb={1}>
              <Box component="span" mr={2}>
                {/* Full-text search filter. We don't use <SearchFilter> to force a large form input */}
                <TextInput
                  resettable
                  helperText={false}
                  source="q"
                  label="Search"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <SearchIcon color="disabled" />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
              <Box component="span" mr={2}>
                {/* Commentable filter */}
                <NullableBooleanInput helperText={false} source="commentable" />
              </Box>
              <Box component="span" mr={2} mb={1.5}>
                <Button variant="outlined" color="primary" type="submit">
                  Применить
                </Button>
              </Box>
              <Box component="span" mb={1.5}>
                <Button variant="outlined" onClick={resetFilter}>
                  Отменить
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Form>
    </div>
  );
};