import { Component, AfterViewInit, ViewEncapsulation, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTable } from 'simple-datatables';
import { ClientDataService, ClientDataFormate } from './client-data.service';
import { finalize } from 'rxjs';
import { OnInit } from '@angular/core';

interface Client extends ClientDataFormate { };

@Component({
  selector: 'app-landing-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-comp.component.html',
  styleUrl: './landing-comp.component.css',
  encapsulation: ViewEncapsulation.None // Needed for simple-datatables styles to apply globally if they are not in valid scope
})
export class LandingCompComponent implements AfterViewInit, OnInit, OnDestroy {
  constructor(private clientDataService: ClientDataService, private router: Router, private cdr: ChangeDetectorRef) { }

  clients: Client[] = [];
  paginatedClients: Client[] = [];
  isLoading: boolean = false;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    // No external library initialization
  }

  ngOnDestroy(): void {
    // Cleanup if necessary
  }

  loadData(): void {
    this.isLoading = true;
    this.clientDataService.getClients().pipe(finalize(() => {
      this.isLoading = false;
      this.updatePagination();
    })).subscribe((data: Client[]) => {
      this.clients = data;
      this.totalItems = data.length;
      this.updatePagination();
      this.cdr.detectChanges();
    });
  }

  updatePagination() {
    this.totalItems = this.clients.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    // Generate page numbers (simple version, can be made dynamic/smart later)
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedClients = this.clients.slice(start, end);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }

  createNew() {
    this.router.navigate(['dashboard/new-client']);
  }

  editClient(client: Client) {
    this.router.navigate(['dashboard/new-client'], { state: { clientData: client } });
  }
  // Helper for template to calculate visible range
  get startItemIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
}