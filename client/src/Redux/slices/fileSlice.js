

// slices/fileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadFiles } from "@/api/DocumentResquest";

export const uploadFilesThunk = createAsyncThunk(
  'files/uploadFiles',
  async (files, { rejectWithValue }) => {
    try {
      const response = await uploadFiles(files);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    processedData: [],
    loading: false,
    error: null,
  },
  reducers: {
    removeFile: (state, action) => {
      const fileIndex = state.files.findIndex(file => file.path === action.payload.path);
      if (fileIndex !== -1) {
        state.files.splice(fileIndex, 1);
      }
    },
    addFiles: (state, action) => {
      state.files.push(...action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFilesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFilesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.processedData = action.payload;
      })
      .addCase(uploadFilesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { removeFile, addFiles } = fileSlice.actions;

export default fileSlice.reducer;
