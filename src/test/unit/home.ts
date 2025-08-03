import express, { Request, Response } from 'express';
import homeRoutes from '../../main/routes/home';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
}));

describe('Home Route Tests', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.set('view engine', 'njk');
    app.use(express.json());

    homeRoutes(app);
  });

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      redirect: jest.fn(),
    };
  });

  it('should render the home page with tasks', async () => {
    const mockTasks = [{ title: 'Test Task', status: 'pending', due_date: '31/12/2025' }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockTasks });

    const homeRouteHandler = app._router.stack.find((layer: any) => layer.route && layer.route.path === '/');
    if (homeRouteHandler) {
      await homeRouteHandler.route.stack[0].handle(mockRequest as Request, mockResponse as Response, () => {});
    }

    expect(mockResponse.render).toHaveBeenCalledWith('home', { tasks: mockTasks });
  });

  it('should render home page with empty tasks on error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch tasks'));

    const homeRouteHandler = app._router.stack.find((layer: any) => layer.route && layer.route.path === '/');
    if (homeRouteHandler) {
      await homeRouteHandler.route.stack[0].handle(mockRequest as Request, mockResponse as Response, () => {});
    }

    expect(mockResponse.render).toHaveBeenCalledWith('home', { tasks: [] });
  });

  // 1. View a single task
  it('should render a single task', async () => {
    const mockTask = { title: 'Test Task', status: 'pending', due_date: '31/12/2025' };
    const taskId = '1';
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockTask });

    mockRequest.params = { id: taskId };

    const viewRouteHandler = app._router.stack.find((layer: any) => layer.route && layer.route.path === '/view/:id');
    if (viewRouteHandler) {
      await viewRouteHandler.route.stack[0].handle(mockRequest as Request, mockResponse as Response, () => {});
    }

    expect(mockResponse.render).toHaveBeenCalledWith('view', { task: mockTask });
  });

  // 2. Edit a task by ID
  it('should render the edit page with task details', async () => {
    const mockTask = { title: 'Test Task', status_id: 2, due_date: '31/12/2025' };
    const mockStatuses = [
      { value: '1', text: 'Overdue' },
      { value: '2', text: 'In Progress' },
      { value: '3', text: 'Pending' },
      { value: '4', text: 'Completed' },
      { value: '5', text: 'Cancelled' }
    ];
    
    const taskId = '1';
    (axios.get as jest.Mock)
        .mockResolvedValueOnce({ data: mockStatuses })
        .mockResolvedValueOnce({ data: mockTask });


    mockRequest.params = { id: taskId };

    const editRouteHandler = app._router.stack.find((layer: any) => layer.route && layer.route.path === '/edit/:id');
    if (editRouteHandler) {
      await editRouteHandler.route.stack[0].handle(mockRequest as Request, mockResponse as Response, () => {});
    }

    expect(mockResponse.render).toHaveBeenCalledWith('edit', { task: mockTask, statusOptions: mockStatuses });
  });

  // 3. Delete a task (GET)
  it('should render the delete page with task details for deletion', async () => {
    const mockTask = { title: 'Test Task', status: 'pending', due_date: '31/12/2025' };
    const taskId = '1';
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockTask });

    mockRequest.params = { id: taskId };

    const deleteRouteHandler = app._router.stack.find((layer: any) => layer.route && layer.route.path === '/delete/:id');
    if (deleteRouteHandler) {
      await deleteRouteHandler.route.stack[0].handle(mockRequest as Request, mockResponse as Response, () => {});
    }

    expect(mockResponse.render).toHaveBeenCalledWith('delete', { task: mockTask });
  });
});
