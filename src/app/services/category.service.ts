import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Category {
  id: string;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/category';

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(
      `${this.apiUrl}/${id}`
    );
  }

  create(data: { nome: string }): Observable<Category> {
    return this.http.post<Category>(
      this.apiUrl,
      data
    );
  }

  update(id: string, categoria: Partial<Category>) {
    return this.http.patch<Category>(
      `${this.apiUrl}/${id}`,
      categoria
    );
  }

  delete(id: string) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

  private mensagemSubject = new BehaviorSubject(false);

  mensagem$ = this.mensagemSubject.asObservable();

  enviarMensagem(valor: boolean): void {
    this.mensagemSubject.next(valor);
  }

}
