// Configuração do Supabase (Substitua as chaves quando tiver criado o projeto)
const supabaseUrl = 'https://sbgqiwcdshpobymimihz.supabase.co';
const supabaseKey = 'sb_publishable_ar4XqnhvV7AV1sM4_63e5w_uzYnI4gz';

// Inicializando o cliente Supabase via CDN
window.supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
