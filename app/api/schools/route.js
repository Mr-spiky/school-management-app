import { query } from '@/lib/database';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email_id = formData.get('email_id');
    const image = formData.get('image');
    
    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id || !image) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const extension = image.name.split('.').pop();
    const filename = `${timestamp}.${extension}`;
    
    // Save image to schoolImages folder
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(process.cwd(), 'public', 'schoolImages', filename);
    await writeFile(path, buffer);
    
    // Insert school data into database
    const result = await query(
      'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, email_id, filename]
    );
    
    return Response.json({ 
      success: true, 
      message: 'School added successfully',
      id: result.insertId 
    });
    
  } catch (error) {
    console.error('Error adding school:', error);
    
    // Provide more specific error messages
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      return Response.json({ 
        error: 'Database access denied. Check your credentials.' 
      }, { status: 500 });
    } else if (error.code === 'ER_NO_SUCH_TABLE') {
      return Response.json({ 
        error: 'Schools table does not exist. Please run the database setup.' 
      }, { status: 500 });
    }
    
    return Response.json({ 
      error: 'Failed to add school. Please try again.' 
    }, { status: 500 });
  }
}