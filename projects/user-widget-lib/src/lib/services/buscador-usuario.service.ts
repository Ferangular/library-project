import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BuscadorUsuarioService {
  private readonly apiUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  obtenerDatosUsuario(usuario: string): Observable<Usuario> {
    return this.http.get<any>(`${this.apiUrl}/${usuario}`).pipe(
      map((data): Usuario => ({
        login: data.login,
        id: data.id,
        node_id: data.node_id,
        avatar_url: data.avatar_url,
        gravatar_id: data.gravatar_id,
        url: data.url,
        html_url: data.html_url,
        followers_url: data.followers_url,
        following_url: data.following_url,
        gists_url: data.gists_url,
        starred_url: data.starred_url,
        subscriptions_url: data.subscriptions_url,
        organizations_url: data.organizations_url,
        repos_url: data.repos_url,
        events_url: data.events_url,
        received_events_url: data.received_events_url,
        type: data.type,
        site_admin: data.site_admin,
        name: data.name,
        company: data.company,
        blog: data.blog,
        location: data.location,
        email: data.email,
        hireable: data.hireable,
        bio: data.bio,
        public_repos: data.public_repos,
        public_gists: data.public_gists,
        followers: data.followers,
        following: data.following,
        created_at: data.created_at,
        updated_at: data.updated_at
      }))
    );
  }
}
