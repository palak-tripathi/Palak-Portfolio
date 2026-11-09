create type public.app_role as enum ('admin','user');
create table public.user_roles (id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete cascade not null, role app_role not null, unique(user_id, role));
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role) returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.user_roles where user_id=_user_id and role=_role) $$;

-- first account ever created becomes the site owner (admin)
create or replace function public.grant_first_admin() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if not exists (select 1 from public.user_roles where role='admin') then
    insert into public.user_roles(user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users for each row execute function public.grant_first_admin();

create table public.site_profile (id int primary key default 1 check (id = 1), data jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now());
grant select on public.site_profile to anon, authenticated;
grant insert, update on public.site_profile to authenticated;
grant all on public.site_profile to service_role;
alter table public.site_profile enable row level security;
create policy "public read profile" on public.site_profile for select to anon, authenticated using (true);
create policy "admin write profile" on public.site_profile for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.items (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('project','achievement','certificate','gallery','document','skill')),
  title text not null,
  description text not null default '',
  category text not null default '',
  image_url text,
  file_url text,
  link_url text,
  github_url text,
  tags text[] not null default '{}',
  sort int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.items to anon, authenticated;
grant insert, update, delete on public.items to authenticated;
grant all on public.items to service_role;
alter table public.items enable row level security;
create policy "public read published" on public.items for select to anon, authenticated using (published or public.has_role(auth.uid(),'admin'));
create policy "admin write items" on public.items for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

insert into public.site_profile(id, data) values (1, jsonb_build_object(
  'name','Palak Tripathi',
  'role','Aspiring Full-Stack Developer',
  'headline','Building Digital Experiences with Code & Creativity.',
  'subtext','Computer Science and Business Systems student exploring full-stack development, creative technology, and meaningful software projects.',
  'about','I''m Palak — a Computer Science and Business Systems student who loves turning ideas into working, beautiful software. Beyond code, I sing, design graphics and keep experimenting with creative tech.',
  'location','India',
  'education','B.Tech in Computer Science & Business Systems',
  'phone','+91 7440608049',
  'email','palak09.learner@gmail.com',
  'instagram','https://instagram.com/thepalakvoice',
  'linkedin','',
  'github','',
  'resume_url',''
));

insert into public.items(kind,title,category,sort) values
('skill','HTML','Frontend',1),('skill','CSS','Frontend',2),('skill','JavaScript','Frontend',3),('skill','React','Frontend',4),
('skill','Node.js','Backend',5),('skill','Java','Languages',6),('skill','Git & GitHub','Tools',7),
('skill','Graphic Design','Creative',8),('skill','Canva','Creative',9),('skill','Singing','Creative',10);
