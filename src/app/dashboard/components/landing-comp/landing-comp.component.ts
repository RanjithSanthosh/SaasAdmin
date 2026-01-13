import { Component, AfterViewInit, ViewEncapsulation, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTable } from 'simple-datatables';
import { ClientDataService, ClientDataFormate } from './client-data.service';
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

  dataTable: any;
  clients: Client[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    // Table initialization moved to loadData to handle async data
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }

  loadData(): void {
    this.clientDataService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
      this.cdr.detectChanges(); // Ensure DOM is updated immediately

      // Wait for next tick to ensure DOM is ready
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          const table = document.getElementById("filter-table") as HTMLTableElement;
          if (table) {
            if (this.dataTable) {
              this.dataTable.destroy();
            }
            this.dataTable = new DataTable(table, {
              searchable: true,
              sortable: true,
              perPage: 10,
              perPageSelect: [5, 10, 15, 20],
              labels: {
                placeholder: "Search clients...",
                perPage: "entries per page",
                noRows: "No clients found",
              }
            });
          }
        }
      }, 0);
    });
  }

  createNew() {
    this.router.navigate(['dashboard/new-client']);
  }
}


