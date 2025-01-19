import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import CreateEvent from './CreateEvent';
import { nextStep, prevStep } from '../../../redux/slices/createEventSlice';

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

vi.mock('./steps/step1/step1.jsx', () => ({
  default: () => <div>Step 1 Content</div>,
}));
vi.mock('./steps/step5/step5.jsx', () => ({
  default: () => <div>Step 5 Content</div>,
}));
vi.mock('../../shared/button/button.jsx', () => ({
  default: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

describe('CreateEvent Component', () => {
  const mockStore = configureStore([]);
  let store;

  beforeEach(() => {
    store = mockStore({
      createEvent: { currentStep: 1, formData: {} },
    });
  });

  it('renders the first step by default', () => {
    render(
      <Provider store={store}>
        <CreateEvent />
      </Provider>
    );

    expect(screen.getByText('Step 1 Content')).toBeInTheDocument();
    expect(screen.getByText('مرحله بعد')).toBeInTheDocument();
    expect(screen.queryByText('مرحله قبل')).not.toBeInTheDocument();
  });

//   it('dispatches the nextStep action when "مرحله بعد" is clicked', () => {
//     const dispatch = vi.fn();
//     useDispatch.mockReturnValue(dispatch);

//     render(
//       <Provider store={store}>
//         <CreateEvent />
//       </Provider>
//     );

//     fireEvent.click(screen.getByText('مرحله بعد'));

//     expect(dispatch).toHaveBeenCalledTimes(1);
//     expect(dispatch).toHaveBeenCalledWith(nextStep());
//   });

  it('dispatches the prevStep action when "مرحله قبل" is clicked', () => {
    store = mockStore({
      createEvent: { currentStep: 3, formData: { province: 'SampleProvince' } },
    });

    const dispatch = vi.fn();
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <CreateEvent />
      </Provider>
    );

    fireEvent.click(screen.getByText('مرحله قبل'));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(prevStep());
  });

//   it('renders the last step without "مرحله بعد" button', () => {
//     store = mockStore({
//       createEvent: { currentStep: 5 },
//     });

//     render(
//       <Provider store={store}>
//         <CreateEvent />
//       </Provider>
//     );

//     expect(screen.getByText('Step 5 Content')).toBeInTheDocument();
//     expect(screen.queryByText('مرحله بعد')).not.toBeInTheDocument();
//     expect(screen.getByText('مرحله قبل')).toBeInTheDocument();
//   });

  it('renders the navigation buttons for intermediate steps', () => {
    store = mockStore({
      createEvent: { currentStep: 3, formData: { province: 'SampleProvince' } },
    });

    render(
      <Provider store={store}>
        <CreateEvent />
      </Provider>
    );

    expect(screen.getByText('مرحله بعد')).toBeInTheDocument();
    expect(screen.getByText('مرحله قبل')).toBeInTheDocument();
  });
});
