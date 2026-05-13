const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const authMiddleware = require('../middleware/auth');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get all properties
router.get('/', async (req, res) => {
  try {
    let query = supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (req.query.property_type) {
      query = query.eq('property_type', req.query.property_type);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single property
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a property
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location_lat,
      location_lng,
      house_type,
      property_type,
      contact_details,
      image_url
    } = req.body;

    const owner_id = req.user.id;

    const { data, error } = await supabase
      .from('properties')
      .insert([
        {
          title,
          description,
          price,
          location_lat,
          location_lng,
          house_type,
          property_type,
          contact_details,
          image_url,
          owner_id
        }
      ])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
