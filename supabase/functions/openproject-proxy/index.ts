const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { apiUrl, apiToken, path } = await req.json();

    if (!apiUrl || !apiToken || !path) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: apiUrl, apiToken, or path' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`Making request to: ${apiUrl}${path}`);

    // Make the request to OpenProject
    const response = await fetch(`${apiUrl}${path}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(`apikey:${apiToken}`)}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenProject API error: ${response.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ 
          error: `OpenProject API error: ${response.status}`,
          details: errorText 
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in openproject-proxy function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: 'Failed to proxy request to OpenProject'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
