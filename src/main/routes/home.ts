import axios from 'axios';
import { Application,  Request, Response } from 'express';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
interface Task {
  title: string;
  status: string;
  description?: string;
  due_date: string;
}


export default function (app: Application): void 
{
  // Home Page (List all tasks)
  app.get('/', async (req: Request, res: Response) => {
    try 
    {
      const responses = await axios.get(`${API_BASE_URL}/tasks`);
      res.render('home', { tasks: responses.data });
    } 
    catch (error) {
      res.render('home', { tasks: [] });
    }
  });

  // View a single task
  app.get('/view/:id', async (req: Request, res: Response) => {
    try 
    {
      const { id } = req.params;
      const responses = await axios.get(`${API_BASE_URL}/tasks/${id}`);
      res.render('view', { task: responses.data });
    } 
    catch (error) 
    {
      res.render('view', { task: null });
    }
  });

  // Edit a task by ID
  app.get('/edit/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const responses = await axios.get(`${API_BASE_URL}/tasks/${id}`);

      res.render('edit', { task: responses.data });
    } 
    catch (error) 
    {
      res.render('edit', { task: null });
    }
  });

  app.get('/delete/:id', async (req: Request, res: Response) => {
    try 
    {
      const { id } = req.params;
      const responses = await axios.get(`${API_BASE_URL}/tasks/${id}`);
      res.render('delete', { task: responses.data });
    } 
    catch (error) 
    {
      res.render('delete', { task: null });
    }
  });

  // Delete a task by ID
  app.post('/delete/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const responses = await axios.delete(`${API_BASE_URL}/tasks/${id}`);

      if (responses.status === 204) 
        {
          res.redirect('/');
        }
    } 
    catch (error) 
    {
      res.render('delete', { task: null });
    }
  });

  app.get('/create', async (req: Request, res: Response) => {
    res.render('create', { task: null });
  });

  // Create a task
  app.post('/create', async (req: Request, res: Response) => {
    try 
    {
      const taskData: Task = req.body;
      const responses = await axios.post(`${API_BASE_URL}/tasks/`, taskData);
      
      if (responses.status === 201) 
      {
        res.redirect('/');
      }
    } 
    catch (error) 
    {
      res.render('delete', { task: null });
    }
  });

  // Update a task
  app.post('/update/:id', async (req: Request, res: Response) => {
    try 
    {
      const { id } = req.params;
      const taskData: Task = req.body;
      const responses = await axios.patch(`${API_BASE_URL}/tasks/${id}/status`, taskData);
      
      if (responses.status === 200) 
      {
        res.redirect('/');
      }
    } 
    catch (error) 
    {
      res.render('delete', { task: null });
    }
  });
}