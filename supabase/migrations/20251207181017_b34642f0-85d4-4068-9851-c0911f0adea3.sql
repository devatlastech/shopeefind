INSERT INTO products (title, description, original_price, discount_price, affiliate_link, category_id, status, images, tags) VALUES
-- Eletrônicos (3 produtos)
('Fone Bluetooth TWS i12', 'Fone de ouvido sem fio com case carregador, som estéreo HD e microfone integrado', 89.90, 34.90, 'https://shopee.com.br/product/123', '5a69b9a4-e5f7-475f-9afc-b094c5e57526', 'featured', ARRAY['https://down-br.img.susercontent.com/file/sg-11134201-22110-kpfqz5kzqfjv3c'], ARRAY['fone', 'bluetooth', 'wireless']),
('Carregador Turbo USB-C 33W', 'Carregador rápido compatível com Samsung, Xiaomi, Motorola e outros', 79.90, 39.90, 'https://shopee.com.br/product/124', '5a69b9a4-e5f7-475f-9afc-b094c5e57526', 'active', ARRAY['https://down-br.img.susercontent.com/file/br-11134207-7r98o-lz0q5k8xb5jk1c'], ARRAY['carregador', 'usb-c', 'turbo']),
('Smartwatch D20 Pro', 'Relógio inteligente com monitor cardíaco, contador de passos e notificações', 149.90, 54.90, 'https://shopee.com.br/product/125', '5a69b9a4-e5f7-475f-9afc-b094c5e57526', 'featured', ARRAY['https://down-br.img.susercontent.com/file/sg-11134201-22120-f6dkpmq8m6kv13'], ARRAY['smartwatch', 'relogio', 'fitness']),

-- Moda (3 produtos)
('Camiseta Oversized Streetwear', 'Camiseta estilo oversized em algodão premium, várias cores disponíveis', 89.90, 45.90, 'https://shopee.com.br/product/126', '798f2259-564d-446b-9223-36924d774f7f', 'active', ARRAY['https://down-br.img.susercontent.com/file/br-11134207-7r98o-lz0rkxsmg5st5d'], ARRAY['camiseta', 'oversized', 'streetwear']),
('Tênis Esportivo Air Max', 'Tênis confortável para corrida e caminhada, sola em gel', 299.90, 129.90, 'https://shopee.com.br/product/127', '798f2259-564d-446b-9223-36924d774f7f', 'featured', ARRAY['https://down-br.img.susercontent.com/file/sg-11134201-22100-s2yg7b4l0sivf3'], ARRAY['tenis', 'esportivo', 'corrida']),
('Calça Jogger Moletom', 'Calça jogger em moletom felpado, cintura elástica com cordão', 129.90, 69.90, 'https://shopee.com.br/product/128', '798f2259-564d-446b-9223-36924d774f7f', 'active', ARRAY['https://down-br.img.susercontent.com/file/br-11134207-7qukw-ljwd5bqn5fmp11'], ARRAY['calca', 'jogger', 'moletom']),

-- Casa & Decoração (2 produtos)
('Luminária LED de Mesa', 'Luminária com 3 níveis de intensidade, USB recarregável', 79.90, 39.90, 'https://shopee.com.br/product/129', 'ae601db5-691f-4919-87e7-ca2597d5bf00', 'active', ARRAY['https://down-br.img.susercontent.com/file/sg-11134201-22110-qj5lz4n0ffjv6f'], ARRAY['luminaria', 'led', 'escritorio']),
('Organizador de Maquiagem Acrílico', 'Organizador transparente com 4 gavetas e compartimentos', 89.90, 49.90, 'https://shopee.com.br/product/130', 'ae601db5-691f-4919-87e7-ca2597d5bf00', 'active', ARRAY['https://down-br.img.susercontent.com/file/br-11134207-7r98o-lz0q8k2xl9k523'], ARRAY['organizador', 'maquiagem', 'acrilico']),

-- Beleza (3 produtos)
('Kit Pincéis Maquiagem 12 Peças', 'Kit profissional com estojo, cerdas macias e cabo de madeira', 69.90, 29.90, 'https://shopee.com.br/product/131', 'f4677cf2-4370-4561-85de-356e781ba6cd', 'featured', ARRAY['https://down-br.img.susercontent.com/file/sg-11134201-22120-yb8k3vq8k6kv2b'], ARRAY['pinceis', 'maquiagem', 'kit']),
('Sérum Vitamina C Facial', 'Sérum clareador com vitamina C, ácido hialurônico e niacinamida', 59.90, 24.90, 'https://shopee.com.br/product/132', 'f4677cf2-4370-4561-85de-356e781ba6cd', 'active', ARRAY['https://down-br.img.susercontent.com/file/br-11134207-7r98o-lz0rk5smg4st12'], ARRAY['serum', 'vitamina-c', 'skincare']),
('Máscara Facial Coreana Pack 10', 'Kit com 10 máscaras faciais hidratantes de diferentes funções', 49.90, 19.90, 'https://shopee.com.br/product/133', 'f4677cf2-4370-4561-85de-356e781ba6cd', 'active', ARRAY['https://down-br.img.susercontent.com/file/sg-11134201-22110-2t4l8mn0xfjv7c'], ARRAY['mascara', 'facial', 'coreana']),

-- Esportes (2 produtos)
('Corda de Pular Profissional', 'Corda com rolamento, cabo de aço revestido, ideal para crossfit', 49.90, 24.90, 'https://shopee.com.br/product/134', 'ec9cc19e-4085-4aca-bd60-b8f9911b0490', 'active', ARRAY['https://down-br.img.susercontent.com/file/sg-11134201-22100-m2zg6a4l0tivf2'], ARRAY['corda', 'pular', 'crossfit']),
('Garrafa Squeeze 2L com Horário', 'Garrafa motivacional com marcador de horário para hidratação', 39.90, 22.90, 'https://shopee.com.br/product/135', 'ec9cc19e-4085-4aca-bd60-b8f9911b0490', 'active', ARRAY['https://down-br.img.susercontent.com/file/br-11134207-7qukw-ljwc5bqn5gnp23'], ARRAY['garrafa', 'squeeze', 'fitness']),

-- Brinquedos (2 produtos)
('Cubo Mágico 3x3 Profissional', 'Speed cube magnético com rotação suave e anti-pop', 29.90, 14.90, 'https://shopee.com.br/product/136', '9bb217c0-bec2-4046-b6ec-81f245ff590f', 'active', ARRAY['https://down-br.img.susercontent.com/file/sg-11134201-22120-kb7k2vq8m6kv3a'], ARRAY['cubo', 'magico', 'puzzle']),
('Carrinho Controle Remoto 4x4', 'Carro off-road com controle remoto, bateria recarregável', 159.90, 79.90, 'https://shopee.com.br/product/137', '9bb217c0-bec2-4046-b6ec-81f245ff590f', 'featured', ARRAY['https://down-br.img.susercontent.com/file/br-11134207-7r98o-lz0rk6smg3st34'], ARRAY['carrinho', 'controle', 'remoto']),

-- Acessórios (3 produtos)
('Bolsa Feminina Transversal', 'Bolsa compacta em couro sintético com alça ajustável', 89.90, 44.90, 'https://shopee.com.br/product/138', '3c038010-cd0f-40fa-9756-b24a49c652a9', 'active', ARRAY['https://down-br.img.susercontent.com/file/sg-11134201-22110-qk5lz3n0xfjv4d'], ARRAY['bolsa', 'transversal', 'feminina']),
('Óculos de Sol Polarizado', 'Óculos unissex com lentes polarizadas e proteção UV400', 79.90, 34.90, 'https://shopee.com.br/product/139', '3c038010-cd0f-40fa-9756-b24a49c652a9', 'active', ARRAY['https://down-br.img.susercontent.com/file/br-11134207-7qukw-ljwd4bqn5fmp45'], ARRAY['oculos', 'sol', 'polarizado']),
('Relógio Feminino Rose Gold', 'Relógio elegante com pulseira em aço inoxidável', 129.90, 54.90, 'https://shopee.com.br/product/140', '3c038010-cd0f-40fa-9756-b24a49c652a9', 'featured', ARRAY['https://down-br.img.susercontent.com/file/sg-11134201-22120-f6dkqmq8n6kv56'], ARRAY['relogio', 'feminino', 'rose']),

-- Livros (2 produtos)
('O Poder do Hábito - Charles Duhigg', 'Best-seller sobre como os hábitos funcionam e como mudá-los', 69.90, 34.90, 'https://shopee.com.br/product/141', 'e5689dc1-cf81-47f6-b192-c21343f4460f', 'active', ARRAY['https://down-br.img.susercontent.com/file/br-11134207-7r98o-lz0q9k2xl8k467'], ARRAY['livro', 'habito', 'autoajuda']),
('Pai Rico Pai Pobre - Robert Kiyosaki', 'Clássico sobre educação financeira e investimentos', 59.90, 29.90, 'https://shopee.com.br/product/142', 'e5689dc1-cf81-47f6-b192-c21343f4460f', 'active', ARRAY['https://down-br.img.susercontent.com/file/sg-11134201-22100-s2yg8b4l0uivf78'], ARRAY['livro', 'financas', 'investimento']);